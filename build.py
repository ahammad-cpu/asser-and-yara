#!/usr/bin/env python3
"""Injects photo data into index.html from saved JSON"""
import json, re

photos = json.load(open('/tmp/wedding_photos.json'))

TEMPLATE = open('/Users/appleera/Downloads/asser-yara-wedding/index.html').read()

placeholder = "const PHOTOS_PLACEHOLDER = true;"

photos_js = (
    "const PHOTOS = {\n"
    "  hero:    '" + photos['hero']    + "',\n"
    "  story:   '" + photos['story']   + "',\n"
    "  gallery: [\n"
    "    '" + photos['gallery'][0] + "',\n"
    "    '" + photos['gallery'][1] + "',\n"
    "    '" + photos['gallery'][2] + "',\n"
    "    '" + photos['gallery'][3] + "',\n"
    "    '" + photos['gallery'][4] + "',\n"
    "  ]\n"
    "};"
)

result = TEMPLATE.replace(placeholder, photos_js)
open('/Users/appleera/Downloads/asser-yara-wedding/index.html', 'w').write(result)
print("Done! Size:", round(len(result)/1024), "KB")
