import { useParams } from "react-router-dom";

export default function News() {
    const { slug } = useParams();

    return <div>News: {slug}</div>;
}