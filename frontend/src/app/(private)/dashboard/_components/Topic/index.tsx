import { Badge } from "@unidash/components/Badge";
import { TopicProps } from "./topicProps.interface";

export function Topic({ title }: TopicProps) {
  return <Badge>{title}</Badge>;
}
