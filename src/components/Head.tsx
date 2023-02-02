import {
  HeadSection,
  Image,
  Description,
  Title,
  Paragraph,
} from '../assets/styled-components/Head';

const Head = ({ img, title, paragraph, reverse } : HeadProps) => {
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

type HeadProps = {
  img: string,
  title: string,
  paragraph: string,
  reverse: boolean,
};
