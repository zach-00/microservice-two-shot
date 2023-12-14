from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json

# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["import_href"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        "manufacturer",
        "id",
    ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        "manufacturer",
        "color",
        "picture_url",
        "id",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }



@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id) #### ASK WHY THIS WORKS. Why does bin = a bin id?
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else: # POST
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin

        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin ID"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def api_shoe(request, id):
    if request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else: # GET
        try:
            shoe = Shoe.objects.get(id=id)
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid shoe ID"}
            )
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
