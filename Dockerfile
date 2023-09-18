FROM nginx:1.25.2-alpine
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
ARG URI
# ENV REACT_APP_URI=api:5000
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]