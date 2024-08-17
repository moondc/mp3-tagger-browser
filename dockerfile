FROM nginx
COPY dist/mp3-tagger-browser/browser/ /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf