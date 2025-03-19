
interface PeopleTabProps {
  data: PoorPeople[];
  onAdd: () => void;
  loading: boolean;
  refreshing: boolean,
  onRefresh: () => Promise<void>,
  loadMore: () => Promise<void>,
  page: number,
  totalPages: number,
  loadingMore: boolean
}

interface CommitteeTabProps {
  data: CommitteeResponse[];
  loading: boolean
}
