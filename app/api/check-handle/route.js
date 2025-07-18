import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    let handle;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
        // Parse multipart form
        const formData = await request.formData();
        handle = formData.get('handle');
        // image = formData.get('image'); // Not used for checking
    } else {
        const body = await request.json();
        handle = body.handle;
        // imageUrl = body.imageUrl; // Not used for checking
    }

    if (!handle) {
        return Response.json({ success: false, error: true, message: 'Handle is required', exists: false })
    }

    try {
        const client = await clientPromise;
        const db = client.db("bittree")
        const collection = db.collection("links")

        // Check if the handle exists in the database
        const doc = await collection.findOne({ handle: handle })

        return Response.json({ 
            success: true, 
            error: false, 
            exists: !!doc, 
            message: doc ? 'Handle exists' : 'Handle does not exist' 
        })
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: true, 
            message: 'Database error', 
            exists: false 
        })
    }
} 