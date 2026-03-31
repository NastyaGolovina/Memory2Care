import { useParams } from "react-router-dom";

export default function Contact() {
    const { slug } = useParams(); // /articles/first-post → slug = "first-post"

    return <div>Статья: {slug}</div>;
}