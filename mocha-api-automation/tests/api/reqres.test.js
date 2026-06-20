import fetch from "node-fetch";

describe("API Tests Suite", function(){
    const baseURL ="https://reqres.in";

    it("READ - Get Single User", async function(){
        const response = await fetch(`${baseURL}/api/users?page=2`);

    });
    it("CREATE - Create New User", async function(){
        const newPost = {
            name: "morpheus",
            job: "leader"
        }
        const response = await fetch(`${baseURL}/api/users`, {
            method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newPost),
        });

    });
});