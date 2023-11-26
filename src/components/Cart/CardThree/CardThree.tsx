import { IAnalytics } from '~/types'
import { Modal } from 'antd'
import { renderOrderStatus } from '~/features'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

interface CardThreeProps {
  data: IAnalytics
}

const CardThree = ({ data }: CardThreeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div
        className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer'
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
          <svg
            className='fill-primary dark:fill-white'
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z'
              fill=''
            />
            <path
              d='M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z'
              fill=''
            />
          </svg>
        </div>

        <div className='mt-4 flex items-end justify-between'>
          <div>
            <h4 className='text-title-md font-bold text-black dark:text-white'>{data.countOrderStatus[0].value}</h4>
            <span className='text-sm font-medium'>Đơn hàng chờ xác nhận</span>
          </div>

          <span className='flex items-center gap-1 text-sm font-medium text-meta-3'>
            2.59%
            <svg
              className='fill-meta-3'
              width='10'
              height='11'
              viewBox='0 0 10 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
                fill=''
              />
            </svg>
          </span>
        </div>
      </div>

      <Modal
        title='Thống kê đơn hàng'
        open={isModalOpen}
        onOk={() => setIsModalOpen(!isModalOpen)}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        width={1000}
        footer={null}
        className='top-5 w-full max-w-[1000px]'
      >
        <div className='grid grid-cols-4 gap-5 w-full mt-6'>
          {data &&
            data.countOrderStatus.map((orderStatus, index) => (
              <div
                key={uuid()}
                className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'
              >
                <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
                  <svg
                    className='fill-primary dark:fill-white'
                    width='20'
                    height='22'
                    viewBox='0 0 20 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z'
                      fill=''
                    />
                    <path
                      d='M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z'
                      fill=''
                    />
                    <path
                      d='M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z'
                      fill=''
                    />
                  </svg>
                </div>

                <div className='mt-4 flex items-end justify-between'>
                  <div className=''>
                    <h4 className='text-title-md font-bold text-black dark:text-white'>
                      {data.moneyOrderStatus[index].value.toLocaleString()} vnđ
                    </h4>
                    <span className='text-base font-medium'>
                      {orderStatus.value} đơn {renderOrderStatus(orderStatus.name).toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </>
  )
}

export default CardThree
