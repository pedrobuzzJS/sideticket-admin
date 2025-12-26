import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/scheduledtask')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/scheduledtask"!</div>
}
