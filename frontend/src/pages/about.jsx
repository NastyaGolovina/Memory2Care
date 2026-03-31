import { useParams } from "react-router-dom";

export default function AboutPage() {
    const { slug } = useParams();

    return <div>AboutPage: {slug}</div>;
}