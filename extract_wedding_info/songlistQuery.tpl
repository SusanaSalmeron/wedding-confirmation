{% for song in songlist %}
- Cancion: {{song.trackName}}
- Cantante/grupo: {{song.artist}}
___________________________________________________
{% endfor %}