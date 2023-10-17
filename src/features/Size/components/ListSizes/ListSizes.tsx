import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { Popconfirm, Space, Table, message } from 'antd'
import { useAppDispatch } from '~/store/store'

import { Button } from '~/components'
import { ISize } from '~/types'
import { formatCurrency } from '~/utils'
import { setOpenDrawer, setSize } from '~/store/slices'
import { useDeleteSizeMutation, useGetAllSizesQuery } from '~/store/services'
import { cancelDelete } from '~/features/Toppings'
import { useState } from 'react'
import Loading from '~/components/Loading/Loading'
import { NotFound } from '~/pages'
import { messageAlert } from '~/utils/messageAlert'
import { pause } from '~/utils/pause'

export const ListSizes = () => {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: sizeList, isError, isLoading } = useGetAllSizesQuery(currentPage)

  const [deleteSize] = useDeleteSizeMutation()
  const handleDelete = async (id: string) => {
    await pause(2000)
    deleteSize(id)
      .unwrap()
      .then(() => {
        messageAlert('Xóa thành công', 'success')
      })
      .catch(() => messageAlert('Xóa thất bại', 'error'))
  }

  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const start = () => {
    setLoading(true)
    setTimeout(() => {
      message.error('Chưa xóa được tất cả :))')
      setLoading(false)
    }, 1000)
  }

  const hasSelected = selectedRowKeys.length > 0
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  if (isLoading) return <Loading />
  if (isError) return <NotFound />
  const columns = [
    {
      title: '#',
      dataIndex: 'index'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className='uppercase'>{name}</span>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${formatCurrency(price)}`
    },
    {
      title: 'Action',
      key: 'action',
      width: 300,
      render: (_: any, size: ISize) => (
        <Space size='middle'>
          <Button
            icon={<BsFillPencilFill />}
            onClick={() => {
              dispatch(setSize(size))
              dispatch(setOpenDrawer(true))
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title='Bạn có muốn xóa topping này?'
            description='Bạn chắc chắn muốn xóa đi size này?'
            okButtonProps={{ style: { backgroundColor: '#3C50E0', color: '#fff' } }}
            onCancel={cancelDelete}
            onConfirm={() => handleDelete(size._id)}
          >
            <Button variant='danger' icon={<BsFillTrashFill />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const sizes = sizeList?.docs.map((size, index) => ({ ...size, key: size._id, index: index + 1 }))

  return (
    <div>
      <Space>
        <Popconfirm
          title='Bạn thực sự muốn xóa những danh mục này?'
          description='Hành động này sẽ xóa những danh mục đang được chọn!'
          // onConfirm={handleDeleteMany}
          className='ml-[10px]'
        >
          <Button variant='danger' onClick={start} disabled={!hasSelected} loading={loading}>
            Xóa tất cả
          </Button>
        </Popconfirm>
      </Space>
      <Table
        className='dark:bg-graydark'
        columns={columns}
        dataSource={sizes}
        pagination={{
          pageSize: 10,
          total: sizeList?.totalDocs,
          onChange(page) {
            setCurrentPage(page)
          }
        }}
        rowSelection={rowSelection}
      />
    </div>
  )
}
