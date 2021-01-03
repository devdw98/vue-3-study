import http from "../http-common";

class PostService{
    getAll() {
        return http.get("/posts");
    }

    get(id: string) {
        return http.get(`/posts/${id}`);
    }

    create(data: any) {
        return http.post("/posts", data);
    }
}