from datetime import date, datetime

from django.shortcuts import render
from django.http import HttpResponse

from intro.models import Event

def index(request):
    def get_age():
        DOB = date(1999, 8, 13)
        today = date.today()
        if (today.month, today.day) < (DOB.month, DOB.day):
            return today.year - DOB.year - 1
        else:
            return today.year - DOB.year

    def get_date_range(event):
        start_date = event.start_date.strftime('%b %Y')
        end_date = event.end_date.strftime('%b %Y') if event.end_date else 'Present'
        return f'{start_date} to {end_date}'
    
    def get_description_lines(event):
        description = event.description
        lines = []
        for line in description.split('\n'):
            text = line.strip()
            is_bold = line.startswith('#')
            if is_bold:
                text = text[1:].strip()

            lines.append({
                'text': text,
                'bold': is_bold,
                'last': False
            })
        lines[-1]['last'] = True
        return lines


    events = Event.objects.filter(display=True).order_by('event_type')
    processed = []
    for event in events:
        processed.append({
            'dates': get_date_range(event),
            'title': event.title,
            'subtitle': event.subtitle,
            'lines': get_description_lines(event),
            'tag': event.tag
        })


    context = {
        'events': processed,
        'age': get_age()
    }
    return render(request, 'intro/index.html', context)