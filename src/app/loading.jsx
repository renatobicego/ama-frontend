import { Spinner } from "@/MT";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="bg-primary2 h-[100vh] w-[100vw]">
            <Spinner className="text-white mx-auto my-auto" />
        </div>
    )
}