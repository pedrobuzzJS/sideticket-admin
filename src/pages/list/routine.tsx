import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/routine')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/routine"!</div>
}
