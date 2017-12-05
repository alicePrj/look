import Body from './app/bodys/body/Body.vue'
import TemplateManage from './app/bodys/body/components/contents/template-manage/TemplateManage.vue'
import TemplateList from './app/bodys/body/components/contents/template-manage/components/TemplateList.vue'
import TemplateStep1 from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep1.vue'
import TemplateStep2 from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep2.vue'
import TemplateStep2Preview from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep2Preview.vue'
import TemplateStep3 from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep3.vue'
import TemplateStep3Preview from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep3Preview.vue'
import TemplateStep4 from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep4.vue'
import TemplateStep4Preview from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep4Preview.vue'
import TemplateStep5 from './app/bodys/body/components/contents/template-manage/components/steps/TemplateStep5.vue'
import CategoryManage from './app/bodys/body/components/contents/category-manage/CategoryManage.vue'
import CategoryIntrovue from './app/bodys/body/components/contents/category-manage/components/contents/CategoryIntro.vue'
import CategoryEdit from './app/bodys/body/components/contents/category-manage/components/contents/edit/CategoryEdit.vue'
import CategoryInfomation from './app/bodys/body/components/contents/category-manage/components/contents/edit/components/CategoryInfomation.vue'
import CategorySubordinateTemplate from './app/bodys/body/components/contents/category-manage/components/contents/edit/components/CategorySubordinateTemplate.vue'
import UserManager from './app/bodys/body/components/contents/user-manager/UserManager.vue'
import RoleManager from './app/bodys/body/components/contents/role-manager/RoleManager.vue'
import QueryManage from './app/bodys/body/components/contents/QueryManage.vue'
import WizardManager from './app/bodys/body/components/contents/WizardManager.vue'
import TempTableManager from './app/bodys/body/components/contents/TempTableManager.vue'
import JobManager from './app/bodys/body/components/contents/JobManager.vue'
import Monitoring from './app/bodys/body/components/contents/Monitoring.vue'
import ErrorPage from './app/bodys/ErrorPage.vue'
import NoPermission from './app/bodys/NoPermission.vue'

export const routes = [
  {
    path: '/',
    component: Body,
    children: [
      { path: '', redirect: 'query/Hive' },
      {
        path: 'template-manage',
        component: TemplateManage,
        children: [
          { path: '', redirect: 'list' },
          { path: 'list', name: 'template-list', component: TemplateList },
          { path: 'step1/:templateId', name: 'template-step1', component: TemplateStep1 },
          { path: 'step2/:templateId', name: 'template-step2', component: TemplateStep2 },
          { path: 'step2preview/:templateId', name: 'template-step2-preview', component: TemplateStep2Preview },
          { path: 'step3/:templateId/:parameter', name: 'template-step3', component: TemplateStep3 },
          { path: 'step3preview/:templateId/:lang', name: 'template-step3-preview', component: TemplateStep3Preview },
          { path: 'step4/:templateId/:lang', name: 'template-step4', component: TemplateStep4 },
          { path: 'step4preview/:templateId/:lang', name: 'template-step4-preview', component: TemplateStep4Preview },
          { path: 'step5/:templateId/:lang', name: 'template-step5', component: TemplateStep5 }
        ]
      },
      {
        path: 'category-manage',
        component: CategoryManage,
        children: [
          { path: '', redirect: 'intro' },
          { path: 'intro', name: 'category-intro', component: CategoryIntrovue },
          {
            path: 'edit',
            component: CategoryEdit,
            children: [
              { path: '', redirect: 'category-infomation/0/0/EN' },
              { path: 'category-infomation/:firstCategoryId/:categoryId/:lang', name: 'category-infomation', component: CategoryInfomation },
              { path: 'subordinate-template/:firstCategoryId/:categoryId', name: 'subordinate-template', component: CategorySubordinateTemplate }
            ]
          }
        ]
      },
      { path: 'user', component: UserManager },
      { path: 'role', component: RoleManager },
      { path: 'query', redirect: 'query/Hive' },
      { path: 'query/:type', name: 'query', component: QueryManage },
      { path: 'wizard', component: WizardManager },
      { path: 'temp', component: TempTableManager },
      { path: 'job', component: JobManager },
      { path: 'monitoring', component: Monitoring }
    ]
  },
  { path: '/no-permission', component: NoPermission },
  { path: '*', component: ErrorPage }
]
