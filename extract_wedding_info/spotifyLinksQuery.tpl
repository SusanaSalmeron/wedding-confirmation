{% for track in tracklist %}
- Cancion: {{track.trackName}}
- Cantante/grupo: {{track.artist}}
- Enlace: {{track.link}}

___________________________________________________
{% endfor %}