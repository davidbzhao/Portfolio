from django.shortcuts import render
from lockdown.decorators import lockdown

from holiday.models import Stanza, Photo

@lockdown(passwords=("hello",))
def index(request):
    stanzas = Stanza.objects.all()
    photos = Photo.objects.all()

    buckets = {}
    for stanza in stanzas:
        if stanza.priority not in buckets:
            buckets[stanza.priority] = {'stanzas': [], 'photos': []}
        buckets[stanza.priority]['stanzas'].append(stanza.text)
    for photo in photos:
        if photo.priority not in buckets:
            buckets[photo.priority] = {'photos': [], 'photos': []}
        buckets[photo.priority]['photos'].append(photo.url)

    sorted_buckets_items = sorted(buckets.items())
    sorted_bucket_values = [b[1] for b in sorted_buckets_items]

    context = {
        'buckets': sorted_bucket_values
    }
    return render(request, 'holiday/index.html', context)