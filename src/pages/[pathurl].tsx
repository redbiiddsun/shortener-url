import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let data: any;

    const options = {
        params: context.params,
    };

    try {
        const response = await axios.get(
            "api/shortener",
            options
        );

        if (response.status === 200) {
            data = response.data;
            return { props: { data: data } }
        } else {
            return { props: { data: null } }
        }
    } catch (error) {
        return { props: { data: null } }
    }
};

export default function Redirect({ data }: { data: any }) {

    const router = useRouter();

    useEffect(() => {
        if (data == null) {
            alert('Not Found')
            router.push('/')
        } else {
            window.location.replace(data.data.targeturl)
        }
    }, [])

    return (
        <>
        </>
    )

}
