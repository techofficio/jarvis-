import Image from 'next/image';

export default function ImageBlock({ alt, url }: { alt: string; url: string }) {
  return <Image src={url} alt={alt} width={512} height={512} />;
}
