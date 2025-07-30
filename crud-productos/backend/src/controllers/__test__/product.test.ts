import request from "supertest"
import server from "../../server"

describe("POST /api/products",()=>{
    it("should display vaidation errors",async()=>{
        const response=await request(server).post("/api/products").send({
            name:"",
            price:-200
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    })
    it("should validate the price will greather than 0",async()=>{
        const response=await request(server).post("/api/products").send({
            name:"Monitor Curvo",
            price:-200
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(3)
        expect(response.body).not.toHaveProperty("data")


    })
    it("should validate the price will number and greather than 0",async()=>{
        const response=await request(server).post("/api/products").send({
            name:"Monitor Curvo",
            price:"hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(4)
        expect(response.body).not.toHaveProperty("data")


    })
    it("should create a new product",async()=>{
        const response=await request(server).post("/api/products").send({
            name:"Mouse - Testing",
            price:300
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")   
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("error")   

    })
})

describe("GET api/products",()=>{
    it("should checj if API/products url exists",async()=>{
        const response=await request(server).get("/api/products")
        expect(response.status).not.toBe(404)
    })
    it("should get JSON Response",async()=>{
        const response=await request(server).get("/api/products")

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)

        expect(response.headers["content-type"]).not.toMatch(/text/)
    })
})

describe("GET api/product/id",()=>{
    it("should return 404 response for not existent id",async()=>{
        const productID=3000
        const response=await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
    })
    it("should validate if param is valid",async()=>{
        const productID="hola"
        const response=await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })
    it("should get a JSON Response with valid ID",async()=>{
        const response=await request(server).get(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
    })
})

describe("PUT api/products/id",()=>{
    it("should validate if param is valid",async()=>{
        const response=await request(server).put(`/api/products/ruta-no-valida`).send({
            name:"Monitor-Test",
            availability:true,
            price:400
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })
    it("Should display msg errors when updating product",async()=>{
        const response = await request(server).put("/api/products/1").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBeTruthy()

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    it("Should display msg errors when updating product with a invalid price",async()=>{
        const response = await request(server).put("/api/products/1").send({
            name:"Monitor - Test",
            availability:true,
            price:-400
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors[0].msg).toBe("Precio No valido")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    it("Should return a 404 error for non-existing product",async()=>{
        const response = await request(server).put("/api/products/5").send({
            name:"Monitor - Test",
            availability:true,
            price:400
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    it("Should update an existing product with valid data",async()=>{
        const response = await request(server).put("/api/products/1").send({
            name:"Monitor - Test",
            availability:true,
            price:400
        })

        expect(response.status).toBe(200)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error")
    })
})

describe("PATCH api/products/id",()=>{
    it("should validate if param is valid",async()=>{
        const response=await request(server).patch(`/api/products/ruta-no-valida`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })
    it("Should return a 404 error for non-existing product",async()=>{
        const response = await request(server).patch("/api/products/5")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    it("Should update an existing product with valid data",async()=>{
        const response = await request(server).patch("/api/products/1")

        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error")
    })
})

describe("DELETE api/products/id",()=>{
     it("should validate if param is valid",async()=>{
        const response=await request(server).delete(`/api/products/ruta-no-valida`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })
    it("Should return a 404 error for non-existing product",async()=>{
        const response = await request(server).delete("/api/products/5")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })
    it("Should delete an existing product",async()=>{
        const response = await request(server).delete("/api/products/1")

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toBe("Producto Eliminado Correctamente")

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error")
    })
})

