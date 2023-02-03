import {
  HeadSection,
  Image,
  Description,
  Title,
  Paragraph,
} from '../assets/styled-components/Head';

const Head = ({ img, title, paragraph, reverse }: HeadProps): JSX.Element => {
  return (
    <HeadSection reverse={reverse}>
      <Image src={img} alt='head image'></Image>
      <Description reverse={reverse}>
        <Title>{title}</Title>
        <Paragraph>{paragraph}</Paragraph>
      </Description>
    </HeadSection>
  );
};

export default Head;

interface HeadProps {
  img: string;
  title: string;
  paragraph: string;
  reverse: boolean;
}
