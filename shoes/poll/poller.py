import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from shoes_rest, here.
# from shoes_rest.models import Something

from shoes_rest.models import BinVO

def get_bins():
    url = "http://wardrobe-api:8000/api/bins/"
    response = requests.get(url)
    content = json.loads(response.content)
    print(content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"], # needs to  be unique, this is what it is using as a search item to find a potentially matching object
            closet_name=bin["closet_name"]             # defaults get set or updated on the object
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
