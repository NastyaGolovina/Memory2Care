import { useParams } from "react-router-dom";

export default function NewsPage() {
    const { slug } = useParams();

    return <div>News: {slug}</div>;
}