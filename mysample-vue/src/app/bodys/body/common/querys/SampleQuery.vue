<template>
  <div class="container">
    <h3>Sample Query</h3>
    <pre><code>
      -- Hourly Unique User per OS Type
      SELECT ost,substr(ts,1,13) as hour, count(distinct encmid) as uv
      FROM oap_real_hbaccess
      WHERE dt = '20170428'
      GROUP BY ost,substr(ts,1,13)

      -- Avg Playtime per Country
      SELECT loc, avg(ppt) as avg_ppt
      FROM oap_real_playtime
      WHERE dt = '20170428'
      GROUP BY loc

      -- Summary Inflow Index
      SELECT seq_value, count(*) as count, count(distinct encterminalid) as device_count
      FROM oap_real_event_sequence
      WHERE dt = '20170428'
      GROUP BY seq_value
      ORDER BY 3 desc

      -- Summary Money Index
      SELECT l_mrsn, count(*) as count, count(distinct encmid) as uv, sum(l_pmoney_c+l_fmoney_c) as change_money
      FROM oap_real_event_money
      WHERE dt = '20170428'
      GROUP BY l_mrsn
    </code></pre>
  </div>
</template>

<script>

</script>

<style scoped>
  .container {
    text-align: left;
  }
</style>
