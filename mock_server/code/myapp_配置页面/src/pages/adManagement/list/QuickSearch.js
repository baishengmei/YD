import React, { PropTypes, Component } from 'react';
import { Input, Icon, Tree, Spin } from 'antd';
import s from './AdManagementList.css';
import history from '../../../core/history';
import { classnames } from '../../../core/utils';

const Search = Input.Search;
const TreeNode = Tree.TreeNode;

const iconTypes = {
  root: 'folder',
  landingPage: 'global',
  download: 'download',
};

const searchInputStyle = {
  width: 150,
  marginLeft: 25
};

const getTreeNodes = (root) => {
  const isLeaf = root.role === 'adGroup';
  const type = iconTypes[root.role] || iconTypes[root.type] || '';
  const title = isLeaf ? root.name : (
    <span className={s['quickSearch-tree-title']}>
      {type ? <Icon type={type} style={{ marginRight: 8 }} /> : null}
      {root.name}
    </span>
  );

  return (
    <TreeNode
      key={`key-${root.id}`}
      title={title}
      role={root.role}
      isLeaf={isLeaf}
    >
      {root.children && root.children.map(getTreeNodes)}
    </TreeNode>
  );
};

const findCampaignByGroupId = (arr, gid) =>
  arr.find(c => c.children && c.children.find(g => `${g.id}` === gid));

class QuickSearch extends Component {
  static propTypes = {
    data: PropTypes.shape({
      status: PropTypes.string.isRequired,
      root: PropTypes.object.isRequired,
    }).isRequired,
    fetchQuickSearchList: PropTypes.func.isRequired,
  };

  state = {
    data: this.props.data,
    keyword: '',
    hide: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      data,
      keyword,
      hide,
    } = this.state;

    return data !== nextState.data
      || keyword !== nextState.keyword
      || hide !== nextState.hide;
  }

  onToggle = () => {
    this.setState({
      hide: !this.state.hide
    });
  }

  onSearch = (value) => {
    this.state.keyword = value;
    this.props.fetchQuickSearchList(value);
  }

  onTreeNodeSelected = ([selectedKey], { selected, node }) => {
    if (selected) {
      const role = node.props.role;
      const id = selectedKey.slice(4);
      let path;

      switch (role) {
        case 'root':
          path = '/adManagement/adCampaign';
          break;
        case 'adCampaign':
          path = `/adManagement/adCampaign/${id}/adGroup`;
          break;
        case 'adGroup': {
          const c = findCampaignByGroupId(this.state.data.root.children, id);
          if (c) {
            path = `/adManagement/adCampaign/${c.id}/adGroup/${id}/adContent`;
          }
          break;
        }
        default:
      }

      if (path) {
        history.push(path);
      }
    }
  }

  render() {
    const {
      data: {
        status,
        root,
      },
      keyword,
      hide,
    } = this.state;

    return (
      <div
        className={classnames({
          [s.qsContainer]: true,
          [s.hide]: hide,
        })}
      >
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={classnames({
            [s.ctrlBtn]: true,
            [s.show]: hide,
          })}
          onClick={this.onToggle}
        />
        <Search
          placeholder='推广系列/组关键词'
          style={searchInputStyle}
          defaultValue={keyword}
          onSearch={this.onSearch}
        />
        <Spin spinning={status === 'loading'}>
          <Tree
            className={s.qsListWrapper}
            defaultExpandedKeys={[`key-${root.id}`]}
            onSelect={this.onTreeNodeSelected}
          >
            {getTreeNodes(root)}
          </Tree>
        </Spin>
      </div>
    );
  }
}

export default QuickSearch;
