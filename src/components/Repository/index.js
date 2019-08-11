import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import Container from '../index';
import {
  Loading,
  Owner,
  IssueList,
  PageButtons,
  PageButtonPrev,
  PageButtonNext,
  EndIssues,
  IssuesTypes,
} from './styles';
import api from '../../services/api';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    nextAllowed: true,
    filters: [
      { state: 'all', label: 'Todos', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterChange: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active === true).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      nextAllowed: issues.data.length !== 0,
    });
  }

  handlePageChange = async e => {
    const { page } = this.state;

    await this.setState({
      page: e === 'prev' ? page - 1 : page + 1,
    });

    this.pageChange();
  };

  pageChange = async () => {
    const { match } = this.props;
    const { page, filters, filterChange } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterChange].state,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      nextAllowed: issues.data.length !== 0,
    });
  };

  handleFilterChange = async e => {
    await this.setState({
      filterChange: e,
      page: 1,
    });

    this.pageChange();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      nextAllowed,
      filters,
      filterChange,
    } = this.state;

    if (loading) {
      return <Loading>Carregando repositório</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssuesTypes active={filterChange}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterChange(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssuesTypes>
          {nextAllowed === true ? (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                    ;
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          ) : (
            <EndIssues>
              <p>Sem mais issues neste repositório :(</p>
            </EndIssues>
          )}
        </IssueList>
        <PageButtons>
          <PageButtonPrev page={page}>
            <FaChevronCircleLeft
              color="#7159c1"
              size={40}
              onClick={() => this.handlePageChange('prev')}
            />
          </PageButtonPrev>
          <PageButtonNext
            page={nextAllowed}
            onClick={() => this.handlePageChange('next')}
          >
            <FaChevronCircleRight color="#7159c1" size={40} />
          </PageButtonNext>
        </PageButtons>
      </Container>
    );
  }
}

export default Repository;
