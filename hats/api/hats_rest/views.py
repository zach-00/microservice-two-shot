import json
from django.shortcuts import render
from .models import LocationVO, Hat
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name", "id"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style_name", "color", "picture_url", "location", "id"]

    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods({"DELETE", "GET"})
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

    else:
        if request.method == "DELETE":
            count, _ = Hat.objects.filter(id=id).delete()
            return JsonResponse({"delete": count > 0})
