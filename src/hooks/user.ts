import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../services/remote/user";
import { UserProfile } from "../types/response";

export default function useUser() : { user: UserProfile, isLoading: boolean, refetch: () => void } {
    const { data: user, isLoading, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => getMyInfo()
    })

    return { user, isLoading, refetch };
}