import { useParams } from "react-router-dom";

export default function TeamPartnersPage() {
    const { slug } = useParams();

    return <div>Статья: {slug}</div>;
}