FROM nginx
WORKDIR /urs/share/nginx/html/
USER root

COPY dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
#FROM nginx
##COPY ./ /app
##WORKDIR /app
#RUN npm install && npm run build
#
#
##RUN mkdir /app
##COPY --from=0 /app/dist /app
##COPY nginx.conf /etc/nginx/nginx.conf
#COPY dist/ /usr/share/nginx/html/
#COPY nginx.conf /etc/nginx/conf.d/default.conf
