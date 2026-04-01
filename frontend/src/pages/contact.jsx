import { useParams } from "react-router-dom";

export default function ContactPage() {
    const { slug } = useParams(); // /articles/first-post → slug = "first-post"

    return <div>Статья: {slug}</div>;
}