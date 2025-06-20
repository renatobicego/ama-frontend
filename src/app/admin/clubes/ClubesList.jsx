import { Card, Typography } from "@/app/utils/materialTailwind"
import ListClubRow from "./ClubListRow"
import LoadingError from "@/app/components/LoadingError"
import useFetch from "@/app/utils/hooks/useFetch"


const ListClubes = () => {
    const {data, loading, error} = useFetch(`club`)

    if (loading || error) return <LoadingError loading={loading} error={error} />

    return (
        <Card className="h-full w-full md:w-2/3">
            <table className="w-full table-auto text-left">
                <thead>
                    <tr>
                    {['Club', 'Editar'].map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                                >
                                {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="max-w-full">
                    {
                        data.clubes.map(club => 
                            <ListClubRow key={club._id} club={club} />
                        )
                    }
                </tbody>
            </table>
        </Card>
    )
}

export default ListClubes