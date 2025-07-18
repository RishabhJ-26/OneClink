import clientPromise from "@/lib/mongodb"
import React from 'react'

export default async function GetHandlePage({ params }) {
    const handle = params.handle;
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the OneClink
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }
  return (
    <div>
      
    </div>
  )
}
