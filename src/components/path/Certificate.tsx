import {
  Group,
  Image,
  ALink,
} from '../../assets/styled-components/path/Certificate'

const Certificate = ({ img, link }: CertificateProps): JSX.Element => {
  return (
    <Group>
      <Image src={img} alt='certificate image'></Image>
      <ALink target='_blank' href={link}>
        Ver
      </ALink>
    </Group>
  )
}

export default Certificate

interface CertificateProps {
  img: string
  link: string
}
