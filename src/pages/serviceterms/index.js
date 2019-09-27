import React, { useState, useEffect } from 'react';
import { Button, Table, Icon, Switch, Modal, Pagination } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import doubleArrow from "../../assets/sort.png";
import styles from './index.less';
const confirm = Modal.confirm;

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeysData, setSelectedRowKeysData] = useState([]);
  const [pagination, setPagination] = useState({total: 1, current_page: 1, per_page: 1});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    fetch('/myjson/bins/w6htt').then(response => response.json())
      .then((data) => {
        setDataSource(data.data);
        setPagination(data.meta.pagination);
      });
  }, []);

  dataSource && dataSource.forEach(item => {
    item.key = item.id
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => setSelectedRowKeysData(selectedRowKeys),
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 切换分页方法
  const handlePage = (ccurrentPage) => {
    console.log(ccurrentPage);
  }
  // 删除项(适用于单项, 多项)
  const handDeleteService = list => {
    const ids = list.join(',')
    confirm({
      title: '确认要删除吗?',
      onOk: async () => {
        console.log('ok');
      }
    })
  }

  // 创建时间排序
  const sortCreateTime = () => {
    let {startSort} = this.state;
    startSort = startSort == "created_at" ? "-created_at" : "created_at";
    console.log(startSort, 'startSortstartSort');
  }

  // 修改时间排序
  const sortUpdateTime = () => {
    let {endSort} = this.state;
    endSort = endSort == "updated_at" ? "-updated_at" : "updated_at";
    console.log(endSort, 'endSortendSort');
  }

  // 切换状态事件
  const handleSwitchChange = async (checked, record) => {
    console.log(checked, record, 'checked, record');
  }

  const createTimeArrow =
    <span>
        创建时间
      </span>

  const updateTimeArrow =
    <span>
        修改时间
      </span>

  const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => {
      return <div><span style={{marginLeft: 20}}>{text}</span></div>
    }
  }, {
    title: createTimeArrow,
    dataIndex: 'created_at',
    key: 'created_at',
    render: (time) => {
      let createTime = time;
      return <span>{createTime}</span>
    }
  }, {
    title: updateTimeArrow,
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (time) => {
      let updateTime = time;
      return <span>{updateTime}</span>;
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        onChange={checked => handleSwitchChange(checked, record)}
        checked={record.status === 1}/>;
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 90,
    render: (text, record) => {
      return <span>
        &nbsp;&nbsp;&nbsp;
        <Icon type="delete"
              className="deleteIcon"
              size="large"
              onClick={() => handDeleteService([record.id])}/>
        </span>;
    }
  }];

  return (
    <PageHeaderWrapper>
      <div className={ styles.servicetermsList }>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource} />
        <Pagination
          className={styles.pagination}
          onChange={handlePage}
          total={pagination.total}
          current={pagination.current_page}
          pageSize={pagination.per_page}
          total={50} />
      </div>
    </PageHeaderWrapper>
  );
}