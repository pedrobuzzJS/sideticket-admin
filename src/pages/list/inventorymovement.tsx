import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/inventorymovement')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/list/inventorymovement"!</div>
}
