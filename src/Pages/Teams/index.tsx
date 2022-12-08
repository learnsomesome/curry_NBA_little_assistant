import { Collapse, Grid } from "antd-mobile";
import { useEffect, useState } from "react";
import { getAllTeams, Team } from "../../utils/api";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const loadData = async () => {
    if (teams.length) return;
    const {data} = await getAllTeams();

    setTeams(data ?? []);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="teams">
      <Collapse accordion>
        {teams.map((item) => (
          <Collapse.Panel key={`${item.id}`} title={
            <>
              <img src={`/src/assets/teams/${item.name.replaceAll(' ', '')}.png`} width={36} style={{verticalAlign: 'middle', marginRight: 16}} />
              <span>{item.name}</span>
            </>
          }>
            <Grid columns={2} gap={8}>
              <Grid.Item>
                <div>协会：<span className="content">{item.conference}</span></div>
              </Grid.Item>
              <Grid.Item>
                <div>分部：<span className="content">{item.division}</span></div>
              </Grid.Item>
              <Grid.Item>
                <div>城市：<span className="content">{item.city}</span></div>
              </Grid.Item>
              <Grid.Item>
                <div>球队：<span className="content">{item.name} ({item.abbreviation})</span></div>
              </Grid.Item>
            </Grid>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default Teams;
