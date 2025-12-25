import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/ticket')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/ticket"!</div>
}
