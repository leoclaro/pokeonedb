export interface Step{
  stepTitle: string,
  steps: GuideStep[]
}

export interface GuideStep {
  title: string
  description: string
  image?: string | string[],
  imageWidthNatural?: boolean
}

export interface ExpandedGuide {
  slug: string
  title: string
  subtitle: string
  description: string,
  imageIsOnlyCard?: boolean,
  image: string
  summary: string
  topics: string[]
  steps: Step[]
  tips?: string[]
  images?: string[]
}