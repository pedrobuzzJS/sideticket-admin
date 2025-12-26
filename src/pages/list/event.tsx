import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/event')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/event"!</div>
}
