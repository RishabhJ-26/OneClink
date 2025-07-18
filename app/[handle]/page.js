import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";
import { getPlatformInfo, getPlatformColor } from '@/utils/platformIcons';
import ProfileWithRobot from "@/components/ProfileWithRobot";

export default async function Page({ params }) {
  const handle = (await params).handle
  const client = await clientPromise;
  const db = client.db("bittree")
  const collection = db.collection("links")

  // If the handle is already claimed, you cannot create the OneClink
  const item = await collection.findOne({ handle: handle })
  if (!item) {
    return notFound()
  }

  // Convert _id to string (and remove toJSON methods)
  const plainItem = {
    ...item,
    _id: item._id?.toString?.() || undefined,
  };

  // console.log(item)

return (
    <div className="flex flex-1 bg-gradient-to-br from-[#10131a] to-[#1a2332] justify-center items-start pt-12 px-4">
      {plainItem && (
        <ProfileWithRobot item={plainItem} />
      )}
    </div>
  );
}