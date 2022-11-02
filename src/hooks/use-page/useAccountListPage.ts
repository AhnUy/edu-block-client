import { TableHeaderProps } from '@components/table'
import { useAccountListCreateForm } from '@hooks/use-form/useAccountListCreateForm'
import { useProfileUpdateForm } from '@hooks/use-form/useProfileUpdateForm'
import { useAccountListQuery } from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  | 'id'
  | 'role'
  | 'avatar'
  | 'dob'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'isMale'
  | 'actions'
>[] = [
  {
    identifier: 'id',
    label: 'ID',
  },
  {
    identifier: 'username',
    label: 'Username',
    align: 'left',
  },
  {
    identifier: 'firstName',
    label: 'First Name',
    align: 'left',
  },
  {
    identifier: 'lastName',
    label: 'Last Name',
    align: 'left',
  },
  {
    identifier: 'avatar',
    label: 'Avatar',
  },
  {
    identifier: 'dob',
    label: 'Date of Birth',
  },
  {
    identifier: 'isMale',
    label: 'Gender',
  },
  {
    identifier: 'role',
    label: 'Role',
  },
  {
    identifier: 'actions',
    label: 'Actions',
  },
]

const searchSelectCategoryGroup = {
  id: 'Identity',
  name: 'Name',
  misc: 'Misc',
}

const searchSelectOption: SelectItem[] = [
  {
    value: 'id',
    label: 'Id',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'username',
    label: 'Username',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'firstname',
    label: 'First name',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'lastname',
    label: 'Last name',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'email',
    label: 'Email',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'phone',
    label: 'Phone number',
    group: searchSelectCategoryGroup.misc,
  },
]

const roleColor = {
  ADMIN: 'red',
  STAFF: 'orange',
  TEACHER: 'blue',
  STUDENT: 'violet',
}

export function useAccountListPage() {
  const {
    query: { data },
    state,
  } = useAccountListQuery()

  const profileForm = useProfileUpdateForm()

  const { account } = useAccountStore()

  const [
    profileUpdateModalState,
    { close: closeProfileUpdateModal, open: openProfileUpdateModal },
  ] = useDisclosure(false)

  const [searchViewState, { close: closeSearchView, open: openSearchView }] =
    useDisclosure(false)

  const createForm = useAccountListCreateForm()

  const [createModalState, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false)

  const navigate = useNavigate()

  return {
    table: {
      accountList: data?.accounts || [],
      tableHeaders,
    },
    state: {
      profileUpdateModal: {
        profileUpdateModalState,
        closeProfileUpdateModal,
        openProfileUpdateModal,
      },
      searchPopover: {
        searchViewState,
        closeSearchView,
        openSearchView,
      },
      createModal: {
        createModalState,
        openCreateModal,
        closeCreateModal,
      },
      ...state,
    },
    others: {
      searchSelectOption,
      roleColor,
      navigate,
    },
    form: { profileForm, createForm },
    account,
  }
}
