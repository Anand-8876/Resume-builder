import PreviewClient from './PreviewClient';

export default function Preview({ params }) {
  return <PreviewClient template={params.template} />;
}

export async function generateStaticParams() {
  return [
    { template: 'modern' },
    { template: 'minimal' },
    { template: 'elegant' },
    { template: 'creative' },
    { template: 'classic' },
  ];
}