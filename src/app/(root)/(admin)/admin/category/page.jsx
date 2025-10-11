import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute';
import { FiPlus } from "react-icons/fi"

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: "Category" }
];

const ShowCategory = () => {
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
            <Card className="py-0 rounded shadow-sm">
              <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                <h4 className="text-xl font-semibold">Add Category</h4>
                <Button asChild >
                  <FiPlus />
                </Button>
              </CardHeader>
              <CardContent className="pb-5">
                
              </CardContent>
            </Card>
    </div>
  )
}

export default ShowCategory