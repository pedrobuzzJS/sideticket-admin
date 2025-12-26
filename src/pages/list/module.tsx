import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/module')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/module"!</div>
}
