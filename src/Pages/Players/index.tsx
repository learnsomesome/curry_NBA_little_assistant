import { useRef, useState } from "react";
import { Collapse, Grid, InfiniteScroll, SearchBar } from 'antd-mobile'
import { getAllPlayers, Player } from "../../utils/api";
import "./index.css";

const Players = () => {
  const page = useRef(0);
  const search = useRef('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const onSearch = async (value: string) => {
    if (search.current === value.trim()) return;
    
    search.current = value.trim();
    page.current = 0;
  
    document.body.scrollIntoView();
    loadMore({ reset: true });
  };

  const loadMore = async ({ reset }: { reset: boolean }) => {
    const {data, meta} = await getAllPlayers({
      page: page.current + 1,
      search: search.current,
    }, !!search.current || reset);

    page.current++;
    setHasMore(!!meta?.next_page);
    setPlayers((v) => reset ? data : [...v, ...(data ?? [])]);
  };

  return (
    <div className="players">
      <div className="searchBar">
        <SearchBar placeholder='请输入球员名称查询' onSearch={onSearch} onClear={() => onSearch('')} />
      </div>
      <Collapse accordion>
          {players.map((item) => (
            <Collapse.Panel key={`${item.id}`} title={item.first_name + ' ' + item.last_name}>
              <Grid columns={2} gap={8}>
                <Grid.Item>
                  <div>高度（英尺）：<span className="content">{item.height_feet}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>高度（英寸）：<span className="content">{item.height_inches}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>体重（磅）：<span className="content">{item.weight_pounds}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>位置：<span className="content">{item.position}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>协会：<span className="content">{item.team.conference}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>分部：<span className="content">{item.team.division}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>城市：<span className="content">{item.team.city}</span></div>
                </Grid.Item>
                <Grid.Item>
                  <div>球队：<span className="content">{item.team.name} ({item.team.abbreviation})</span></div>
                </Grid.Item>
              </Grid>
            </Collapse.Panel>
          ))}
      </Collapse>
      <InfiniteScroll threshold={10} loadMore={() => loadMore({ reset: false })} hasMore={hasMore}/>
    </div>
  );
}

export default Players;
