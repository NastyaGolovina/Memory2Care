import { useParams } from "react-router-dom";

export default function TeamPartners() {
    const { slug } = useParams();

    return <div>Статья: {slug}</div>;
}