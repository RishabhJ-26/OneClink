import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const contentType = request.headers.get('content-type') || '';
    let handle, imageData, imageType, links, desc;
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        handle = formData.get('handle');
        desc = formData.get('desc') || '';
        const linksRaw = formData.get('links');
        try {
          links = linksRaw ? JSON.parse(linksRaw) : [];
        } catch {
          links = [];
        }
        const imageFile = formData.get('image');
        if (imageFile && typeof imageFile.arrayBuffer === 'function') {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            imageData = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
            imageType = 'base64';
        }
    } else {
        const body = await request.json();
        handle = body.handle;
        desc = body.desc || '';
        links = body.links || [];
        if (body.imageUrl) {
            imageData = body.imageUrl;
            imageType = 'url';
        }
    }

    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the OneClink
    const doc = await collection.findOne({handle: handle})

    if (doc){
      return Response.json({ success: false, error: true, message: 'This OneClink already exists!', result: null })
    }

    const insertDoc = { handle, desc, links };
    if (imageData) {
      insertDoc.image = imageData;
      insertDoc.imageType = imageType;
    }

    const result = await collection.insertOne(insertDoc)
    
    return Response.json({ success: true, error: false, message: 'Your OneClink has been generated!', result: result,  })
  }