import json
from django.shortcuts import render
from .models import LocationVO, Hat
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "section_number", "shelf_number", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["name", "import_href"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style_name", "color", "picture_url",]

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
            locations_href = f"/api/locations/{location_vo_id}/"
            locations = LocationVO.objects.get(import_href=locations_href)
            content["locations"] = locations
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference id"},
                status=400,
            )

        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatDetailEncoder,
            safe=False,
        )


def api_show_hat(request, pk):
    hat = Hat.objects.get(id=pk)
    return JsonResponse(
        hat,
        encoder=HatDetailEncoder,
        safe=False,
    )